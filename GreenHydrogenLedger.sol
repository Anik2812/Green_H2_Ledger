// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title GreenHydrogenLedger
 * @dev A smart contract to certify green hydrogen production, mint tradable Green Hydrogen Credits (GHC),
 * and manage the roles of Producers, Buyers, Certifiers, and Auditors.
 * This contract uses Pinata for IPFS storage of certification proofs.
 * The owner is hardcoded to a specific address for this MVP.
 */
contract GreenHydrogenLedger is ERC20, Ownable {
    using Counters for Counters.Counter;

    // --- STATE VARIABLES ---
    Counters.Counter private _batchIds;
    Counters.Counter private _certificateIds;

    enum Role { None, Producer, Buyer, Certifier, Auditor, Regulator }
    enum BatchStatus { Pending, Certified, Rejected }

    struct ProductionBatch {
        uint256 id;
        address producer;
        uint256 volumeKg;
        string energySource;
        string proofCid; // IPFS hash from Pinata
        BatchStatus status;
        uint256 certificateId;
        uint256 timestamp;
    }

    struct Certificate {
        uint256 id;
        uint256 batchId;
        address certifier;
        string certificateIpfsHash;
        uint256 timestamp;
    }

    // --- MAPPINGS ---
    mapping(address => Role) public userRoles;
    mapping(address => bool) public isVerified;
    mapping(uint256 => ProductionBatch) public productionBatches;
    mapping(uint256 => Certificate) public certificates;
    mapping(address => uint256[]) private producerBatches;

    // --- EVENTS ---
    event UserRegistered(address indexed user, Role role);
    event UserVerified(address indexed user, address indexed verifier);
    event BatchRegistered(uint256 indexed batchId, address indexed producer, uint256 volumeKg, string proofCid);
    event BatchCertified(uint256 indexed batchId, uint256 indexed certificateId, address indexed certifier);
    event BatchRejected(uint256 indexed batchId, address indexed certifier, string reason);

    // --- MODIFIERS ---
    modifier onlyRole(Role _role) {
        require(userRoles[msg.sender] == _role, "Caller does not have the required role");
        _;
    }

    modifier onlyVerifiedUser() {
        require(isVerified[msg.sender], "User is not verified");
        _;
    }

    // --- CONSTRUCTOR ---
    // The contract owner is hardcoded for this MVP.
    constructor() ERC20("Green Hydrogen Credit", "GHC") Ownable(0xFbe50AE13DEd06c863320AC161bB77C8A40338e2) {}

    // --- ROLE MANAGEMENT (ADMIN ONLY) ---
    function addCertifier(address _certifier) external onlyOwner {
        userRoles[_certifier] = Role.Certifier;
        isVerified[_certifier] = true;
    }

    function addAuditor(address _auditor) external onlyOwner {
        userRoles[_auditor] = Role.Auditor;
        isVerified[_auditor] = true;
    }
    
    function addRegulator(address _regulator) external onlyOwner {
        userRoles[_regulator] = Role.Regulator;
        isVerified[_regulator] = true;
    }

    function verifyUser(address _user) external onlyOwner {
        require(userRoles[_user] == Role.Producer || userRoles[_user] == Role.Buyer, "Can only verify Producers or Buyers");
        isVerified[_user] = true;
        emit UserVerified(_user, msg.sender);
    }

    // --- USER ONBOARDING ---
    function registerAs(Role _role) external {
        require(_role == Role.Producer || _role == Role.Buyer, "Public can only register as Producer or Buyer");
        require(userRoles[msg.sender] == Role.None, "User already registered");
        userRoles[msg.sender] = _role;
        emit UserRegistered(msg.sender, _role);
    }

    // --- PRODUCER FLOW ---
    function registerProductionBatch(uint256 _volumeKg, string memory _energySource, string memory _proofCid) 
        external 
        onlyRole(Role.Producer) 
        onlyVerifiedUser 
    {
        _batchIds.increment();
        uint256 newBatchId = _batchIds.current();
        
        productionBatches[newBatchId] = ProductionBatch({
            id: newBatchId,
            producer: msg.sender,
            volumeKg: _volumeKg,
            energySource: _energySource,
            proofCid: _proofCid,
            status: BatchStatus.Pending,
            certificateId: 0,
            timestamp: block.timestamp
        });

        producerBatches[msg.sender].push(newBatchId);
        emit BatchRegistered(newBatchId, msg.sender, _volumeKg, _proofCid);
    }

    // --- CERTIFIER FLOW ---
    function certifyBatch(uint256 _batchId, string memory _certificateIpfsHash) 
        external 
        onlyRole(Role.Certifier) 
        onlyVerifiedUser
    {
        ProductionBatch storage batch = productionBatches[_batchId];
        require(batch.producer != address(0), "Batch does not exist");
        require(batch.status == BatchStatus.Pending, "Batch not pending certification");

        _certificateIds.increment();
        uint256 newCertificateId = _certificateIds.current();

        certificates[newCertificateId] = Certificate({
            id: newCertificateId,
            batchId: _batchId,
            certifier: msg.sender,
            certificateIpfsHash: _certificateIpfsHash,
            timestamp: block.timestamp
        });

        batch.status = BatchStatus.Certified;
        batch.certificateId = newCertificateId;
        
        _mint(batch.producer, batch.volumeKg * (10**decimals()));
        emit BatchCertified(_batchId, newCertificateId, msg.sender);
    }
    
    function rejectBatch(uint256 _batchId, string memory _reason) 
        external 
        onlyRole(Role.Certifier) 
        onlyVerifiedUser
    {
        ProductionBatch storage batch = productionBatches[_batchId];
        require(batch.producer != address(0), "Batch does not exist");
        require(batch.status == BatchStatus.Pending, "Batch not pending certification");

        batch.status = BatchStatus.Rejected;
        emit BatchRejected(_batchId, msg.sender, _reason);
    }
    
    // --- VIEW FUNCTIONS ---
    function getProducerBatches(address _producer) external view returns (uint256[] memory) {
        return producerBatches[_producer];
    }
    
    function getRole(address _user) external view returns (Role) {
        return userRoles[_user];
    }
}




//deployed contract address - 0xafaad41d3642e35be87e4577e899f69b97386d6b 
