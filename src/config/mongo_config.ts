const mongo_config = {
    login: process.env.MONGO_LOGIN,
    password: process.env.MONGO_PASSWORD,
    url: process.env.MONGO_CLUSTER,
    db_name: process.env.MONGO_DB
}

export default mongo_config;