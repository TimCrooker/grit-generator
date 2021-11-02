import path from 'path'
import { Projen } from 'projenerator'

const generator = path.join(__dirname, '..')

test('defaults', async () => {
	const projen = new Projen({
		generator,
		mock: true
	})
  await projen.run()

  expect(await projen.getOutputFiles()).toMatchSnapshot()
})
