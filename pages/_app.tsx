import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, darkTheme, DisclaimerComponent } from '@rainbow-me/rainbowkit'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NextNProgress from 'nextjs-progressbar'
import { xdai } from '@constants/chains'
import { ThemeProvider, vars } from '@kalidao/reality'
import '@kalidao/reality/styles'

const queryClient = new QueryClient()

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.arbitrum, chain.optimism, xdai, chain.goerli],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }),
    jsonRpcProvider({
      rpc: (c) => {
        if (c.id === xdai.id) return { http: process.env.NEXT_PUBLIC_QUICKNODE_GNOSIS! }
        if (c.id === chain.arbitrum.id || c.id === chain.goerli.id)
          return { http: process.env.NEXT_PUBLIC_QUICNODE_HTTP!, webSocket: process.env.NEXT_PUBLIC_QUICKNODE }
        return null
      },
    }),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'KALI',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the <Link href="/tos">Terms of Service</Link> and acknowledge you have read
    and understand the Disclaimers therein.
  </Text>
)

const appInfo = {
  appName: 'KALI',
  learnMoreUrl: 'https://docs.kali.gg/',
  disclaimer: Disclaimer,
}

function MyApp({ Component, pageProps }: AppProps) {
  console.log('mode', vars.colors.background)
  return (
    <ThemeProvider defaultMode='light' defaultAccent='violet'>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          coolMode
          chains={chains}
          theme={darkTheme({
            accentColor: 'hsl(250, 51.8%, 51.2%)',
            accentColorForeground: '#ededed',
          })}
          appInfo={appInfo}
          modalSize="compact"
        >
            <NextNProgress color="#5842c3" />
            <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
