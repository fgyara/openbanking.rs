extern crate reqwest;

use std::io::Read;

pub fn main(config: super::config::Config, openidconfiguration: super::oidcdiscovery::OpenIDConfiguration) -> Result<(), Box<std::error::Error>> {
    let path = std::env::current_dir()?;
    debug!("cwd={}", path.display());

    let mut identity_buf = Vec::new();
    {
        let mut key_file = std::fs::File::open(
            "keys/tls_client_auth_ps256/transport/755f353a31e0bfbf4e6317c9b52cfa37aa2bbbab.key",
        )?;
        key_file.read_to_end(&mut identity_buf)?;
        let mut pem_file = std::fs::File::open(
            "keys/tls_client_auth_ps256/transport/755f353a31e0bfbf4e6317c9b52cfa37aa2bbbab.pem",
        )?;
        pem_file.read_to_end(&mut identity_buf)?;
    }
    let pkcs12 = reqwest::Identity::from_pem(&identity_buf)?;
    debug!("pkcs12={:?}", pkcs12);

    let mut headers = reqwest::header::HeaderMap::new();
    {
        headers.insert(
            reqwest::header::USER_AGENT,
            reqwest::header::HeaderValue::from_static(
                "banaio-openbankingforgerock/0.1.0 (https://github.com/banaio/openbanking)",
            ),
        );
        headers.insert(
            reqwest::header::CACHE_CONTROL,
            reqwest::header::HeaderValue::from_static("no-cache"),
        );
        debug!("headers={:?}", headers);
    }

    let client = reqwest::Client::builder()
        // .add_root_certificate(cert)
        .identity(pkcs12)
        .use_rustls_tls()
        .default_headers(headers)
        .build()?;
    let mut params = std::collections::HashMap::new();
    params.insert("grant_type", "client_credentials");
    params.insert("scope", "openid payments fundsconfirmations accounts");
    params.insert("client_id", config.client_id.as_str());
    debug!("params={:?}", params);

    // "https://matls.as.aspsp.ob.forgerock.financial/oauth2/access_token"
    let url = openidconfiguration.token_endpoint.as_str();
    let request = client
        .post(url)
        .form(&params);
    debug!("request={:?}", request);

    let mut response = request.send().expect("request.send() failed");
    // std::io::copy(&mut response, &mut std::io::stdout())?;

    let mut response_buf = String::new();
    response.read_to_string(&mut response_buf).expect("Failed to read response");
    info!("response={}", response_buf);

    Ok(())
}
