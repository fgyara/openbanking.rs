#[macro_use]
extern crate log;
extern crate env_logger;

mod config;
mod oidcdiscovery;
mod client;

// fn main() -> Result<(), std::io::Error> {
fn main() -> Result<(), Box<dyn std::error::Error>> {
    // std::env::set_var("RUST_LOG", "trace,actix_web=trace,actix_server=trace");
    // std::env::set_var("RUST_LOG", "debug,actix_web=debug,actix_server=debug");
    std::env::set_var("RUST_LOG", "info,actix_web=info,actix_server=info");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    let config = config::read()?;
    oidcdiscovery::fetch(config)?;

    Ok(())
}
