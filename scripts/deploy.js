async function main() {
  const Fundraiser = await ethers.getContractFactory("Fundraiser")
  const accounts = await ethers.getSigners()

  const fundraiser = await Fundraiser.deploy()
  await fundraiser.deployed()

  console.log(`Contract Deployed To: ${fundraiser.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
