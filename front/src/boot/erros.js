import { defineBoot } from '#q-app'
import { avisarErro } from '@/utils/dialogos'

export default defineBoot(({ app }) => {
  app.config.errorHandler = avisarErro
})
