const Contest = artifacts.require("Contest");

module.exports = function (deployer) {
  deployer.deploy(
    Contest,
    "0x71CF362a43E7E257F73f8320ac6642B0774bAE43",
    "0xceb98a402AB1301B24998Ee4e815bFF41faC14b5",
    "0x166b3F8C76C81439F157cfF796F82ed93C00ebd6",
    "0x166b3F8C76C81439F157cfF796F82ed93C00ebd6",// top stake validator
  );
};
