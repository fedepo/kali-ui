import React from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button } from '@kalidao/reality'
import DAO_ABI from '@abi/KaliDAO.json'
import { IconCheck } from '@kalidao/reality'
import ChainGuard from '../ChainGuard'

type ProcessProps = {
  chainId: number
  dao: string
  proposalId: string
}

export default function Process({ chainId, dao, proposalId }: ProcessProps) {
  const { config } = usePrepareContractWrite({
    address: dao as `0xstring`,
    abi: DAO_ABI,
    functionName: 'processProposal',
    chainId: chainId,
    args: [proposalId],
  })
  const { write } = useContractWrite(config)

  return (
    <ChainGuard
      fallback={
        <Button size="small" prefix={<IconCheck />} tone="accent" variant="secondary" disabled={!write}>
          Process
        </Button>
      }
    >
      <Button
        size="small"
        prefix={<IconCheck />}
        tone="accent"
        variant="secondary"
        onClick={() => write?.()}
        disabled={!write}
      >
        Process
      </Button>
    </ChainGuard>
  )
}
