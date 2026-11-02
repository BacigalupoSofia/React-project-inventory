import { providersData } from "../data/stock";

export default function Providers() {
  return (
    <section id="center">
      <div className="providers-grid p-5 m-3">
        <h2>Providers</h2>
        <p>List of providers will be displayed here.</p>
        {providersData.map((provider) => (
          <ProviderCard key={provider.name} provider={provider} />
        ))}
      </div>
    </section>
  );
}

function ProviderCard({ provider }) {
  return (
    <div className="provider-card">
      <img src={provider.logo} alt={`${provider.name} logo`} />

      <h3>{provider.name}</h3>

      <a href={provider.webSite} target="_blank" rel="noreferrer">
        Visit website
      </a>
    </div>
  );
}
