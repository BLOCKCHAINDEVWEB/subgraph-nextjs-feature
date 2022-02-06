# Subgraph Studio

## Get started:
Clone code:
```bash
git clone https://github.com/BLOCKCHAINDEVWEB/subgraph-nextjs-feature.git
cd subgraph-nextjs-feature
```

Duplicate the .env file given as an example:
```bash
cd client
cp .env.sample .env
```

Complete your .env file with for example:
```bash
NEXT_PUBLIC_TEMPORARY_QUERY_URL=https://api.studio.thegraph.com/query/11783/feature/v0.0.1
```

Install dependencies:
```bash
yarn
```

Run your application:
```bash
npm run dev
```

## Create your subgraph

Prerequisite 
```bash
$ npm install -g @graphprotocol/graph-cli
$ graph help
```

Started your first subgraph
- Open url https://thegraph.com/en/
- Create your account network on TheGraph site on url https://thegraph.com/
- Select Subgraph Studio in The Graph list
- Click on button: Create a Subgraph
- Give your Subgraph Name
- Enter in your subgraph

In your terminal console:  
1. initialize your subgraph with smart-contract  
```bash
  $ graph init --contract-name Feature \
  --index-events \
  --product subgraph-studio \
  --from-contract 0x10c6eE1Fc45dB7872...8fBdb7 
  ? Subgraph name » Feature
  ? Directory to create the subgraph in » Zola
  ? Ethereum network » Rinkeby
  ? Contract address » 0x10c6eE1Fc45dB7872...8fBdb7
  ? Contract Name » Feature
```
2. authenticate whith your deploy key
```bash
$  graph auth --studio
? Deploy key » e03b9d...712d9f
```

3. generate types for contract ABIs and GraphQL schema
```bash
$ graph codegen && graph build
```

3. deploy your code with subgraph slug
```bash
$ graph deploy --studio feature
? Version Label (e.g. v0.0.1) · v0.0.1
```

Open your subgraph
1. give an query in your playground
```graphql
query {
  claimSubmits(first: 5) {
    id
    _transactionID
    _claimID
    _receiver
  }
}
```

2. use your endpoint in a loading playground GraphQL
- Open url https://www.graphqlbin.com/v2/new
- Paste your endpoint api subgraph: https://api.studio.thegraph.com/query/11783/feature/v0.0.1
- Give an query similar to TheGraph or production playground

## Learn more
- Subgraph-studio: https://thegraph.com/blog/building-with-subgraph-studio
- Zora documentation: https://docs.zora.co/docs/smart-contracts/zora-contracts
