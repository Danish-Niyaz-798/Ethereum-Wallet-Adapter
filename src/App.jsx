import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, createConfig, WagmiProvider, useConnect, useAccount, useBalance, useSendTransaction, } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import './App.css'

const queryClient = new QueryClient()

export const config = createConfig({
  chains: [mainnet ],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
  },
})

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <WalletConnector />
          </div>
          <MyAddress />
          <EthSend />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function MyAddress() {
  const { address } = useAccount()
  const balance = useBalance({ address })
// Big Ints

console.log(balance);
  return <div>
    {address}<br/>
    {balance?.data?.formatted}
    </div>
}

function WalletConnector() {
  const { connectors, connect } = useConnect()

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector})}>
        {connector.name}
      </button>
  ))
}

function EthSend() { 
  const { data: hash, sendTransaction } = useSendTransaction()


  function sendEth() {
    sendTransaction({
      to: document.getElementById("address").value,
      value: 100000000000000000 // 17 0s = 0.1 ETH
    })
  } 

  // refs?
    return <div>
      <input id="address" type="text" placeholder="Address.."></input>
      <button onClick={sendEth}>Send 0.1 ETH</button>
    </div>
  }

export default App;

// function App() {
//   return <h1>Hello</h1>
// }
// export default App