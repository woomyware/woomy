// Copyright 2020 Emily J. / mudkipscience and contributors. Subject to the AGPLv3 license.

module.exports = async (client, error) => {
  client.logger.error(JSON.stringify(error.stack))
}