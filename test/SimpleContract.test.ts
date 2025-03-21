import { expect } from "chai";
import { ethers } from "hardhat";

describe("SimpleContract", function () {
  let SimpleContract: any;
  let simpleContract: any;
  let owner: any;
  let addr1: any;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // 컨트랙트 배포
    SimpleContract = await ethers.getContractFactory("SimpleContract");
    simpleContract = await SimpleContract.deploy("Hello, Contract!");
    await simpleContract.waitForDeployment();
  });

  it("✅ 배포 후 기본 메시지를 올바르게 가져오는지 확인", async function () {
    expect(await simpleContract.message()).to.equal("Hello, Contract!");
  });

  it("✅ setMessage()가 정상적으로 실행되는지 확인", async function () {
    await simpleContract.setMessage("New Message");
    expect(await simpleContract.message()).to.equal("New Message");
  });

  it("✅ setMessage()가 다른 계정에서도 실행되는지 확인", async function () {
    await simpleContract.connect(addr1).setMessage("Another Message");
    expect(await simpleContract.message()).to.equal("Another Message");
  });
});
