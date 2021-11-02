import { Projen } from "projenerator"
import path from 'path'

test('Generator cascade', async () => {
	// run the top level generator as not a mock and direct output to local fixtures
	const genGen = new Projen({
		generator: path.join(__dirname, "../"),
		mock: true,
	})
	await genGen.run()
	expect(await genGen.getOutputFiles()).toMatchSnapshot()
})
