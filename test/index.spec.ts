import { Grit } from "grit-cli"
import path from 'path'

test('Generator output', async () => {
	// run the top level generator as not a mock and direct output to local fixtures
	const grit = new Grit({
		generator: path.join(__dirname, "../"),
		mock: true,
	})
	await grit.run()
	expect(await grit.getOutputFiles()).toMatchSnapshot()
})
