use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct Config {
    pub ssid: String,
    pub organisation_id: String,
    pub ssa: String,
    pub kid: String,
    pub client_id: String,
    pub request_object_signing_alg: String,
    pub encryption_private: String,
    pub encryption_public: String,
    pub signature_private: String,
    pub signature_public: String,
    pub transport_private: String,
    pub transport_public: String,
    pub register_response: String,
}

pub fn read() -> Result<Config, Box<std::error::Error>> {
    let reader = std::fs::File::open("keys/config/config_tls_client_auth_ps256.yml")?;

    let config: Config = serde_yaml::from_reader(reader)?;
    // println!("{:#?}", config);

    // let _ = serde_yaml::to_string(&config).expect("error from to_string");
    // println!("{:#?}", config_json);

    Ok(config)
}
