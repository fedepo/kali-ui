import { Progress } from '@design/Progress'
import { Box, Stack, Input, IconArrowDown, Button, Checkbox } from '@kalidao/reality'
import Terms from './Terms'
import { useSwapStore } from './store'
import * as styles from './styles.css'
import { useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import { Warning } from '@design/elements'

export default function Swapper() {
  const token = useSwapStore((state) => state.token)
  const dao = useSwapStore((state) => state.dao)
  const consent = useSwapStore((state) => state.consent)
  const multiplier = useSwapStore((state) => state.swap.purchaseMultiplier)
  const userBalance = useSwapStore((state) => state.user.tokenBalance)
  const [amountIn, setAmountIn] = useState(0)
  const [amountOut, setAmountOut] = useState(0)
  const [warning, setWarning] = useState('')

  const handleAmountIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amountIn = Number(e.target.value)
    setAmountIn(amountIn)
    const amountOut = ethers.utils.formatUnits(
      ethers.utils.parseUnits(amountIn.toString(), token.decimals).mul(BigNumber.from(multiplier)),
      dao.decimals,
    )
    setAmountOut(Number(amountOut))

    if (amountIn > userBalance) {
      setWarning('Insufficient balance')
    } else {
      setWarning('')
    }
  }

  const handleSwap = () => {}

  return (
    <Box className={styles.container}>
      <Stack align="center" justify={'center'}>
        <Input
          placeholder="0"
          type="number"
          min="0"
          value={amountIn}
          onChange={handleAmountIn}
          label={token.name}
          suffix={token.symbol}
        />
        <IconArrowDown />
        <Input placeholder="0" min="0" value={amountOut} disabled label={dao.name} suffix={dao.symbol} />
        <Terms />
        <Button width="full" disabled={!consent || warning != ''} onClick={handleSwap}>
          Swap
        </Button>
        <Warning warning={warning} />
      </Stack>
    </Box>
  )
}
