import { providersData } from "../data/stock";

export default function Providers() {
  return (
    <section id="center">
      <h2 className="providers-title"> Dental Providers </h2>
      <div className="providers-grid p-5 m-3">
        {providersData.map((provider) => (
          <ProviderCard key={provider.name} provider={provider} />
        ))}
      </div>
    </section>
  );
}

function ProviderCard({ provider }) {
  return (
    <>
      <div className="provider-card card text-center">
        <div className="card-header">
          <h3>{provider.name}</h3>
        </div>

        <div className="card-body">
          <img
            className="logo-img"
            src={provider.logo}
            alt={`${provider.name} logo`}
          />

          <div className="card-description">
            <p className="card-text">
              {provider.description ||
                "here provider description here provider description here provider description here provider description here provider description here provider description here provider description here provider description here provider description here provider description here provider description"}
            </p>
            <a
              className="btn btn-primary btn-web"
              href={provider.webSite}
              target="_blank"
              rel="noreferrer"
            >
              Visit website
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
