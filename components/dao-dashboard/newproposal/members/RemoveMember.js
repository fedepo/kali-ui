import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useContract, useSigner } from 'wagmi'
import { Flex, Text, Button } from '../../../../styles/elements'
import { Form, FormElement, Label, Input } from '../../../../styles/form-elements'
import FileUploader from '../../../tools/FileUpload'
import KALIDAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { uploadIpfs } from '../../../tools/ipfsHelpers'
import Back from '../../../../styles/proposal/Back'

export default function RemoveMember({ setProposal }) {
  const router = useRouter()
  const daoAddress = router.query.dao
  const daoChainId = router.query.chainId
  const { data: signer } = useSigner()

  const kalidao = useContract({
    addressOrName: daoAddress,
    contractInterface: KALIDAO_ABI,
    signerOrProvider: signer,
  })

  // form
  const [recipient, setRecipient] = useState(null)
  const [amount, setAmount] = useState(null)
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    e.preventDefault()

    amount = ethers.utils.parseEther(amount).toString()

    let docs
    if (file) {
      docs = await uploadIpfs(daoAddress, 'Add Member Proposal', file)
    } else {
      docs = description
    }

    console.log('Proposal Params - ', 1, docs, [recipient], [amount], [Array(0)])

    try {
      const tx = await kalidao.propose(1, docs, [recipient], [amount], [Array(0)])
      console.log('tx', tx)
    } catch (e) {
      console.log('error', e)
    }
  }

  return (
    <Flex dir="col" gap="md">
      <Text
        css={{
          fontFamily: 'Regular',
        }}
      >
        Kick or penalize a member by burning her DAO tokens
      </Text>
      <Form>
        <FormElement>
          <Label htmlFor="recipient">Recipient</Label>
          <Input name="recipient" type="text" defaultValue={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </FormElement>
        <FormElement>
          <Label htmlFor="amount">Amount</Label>
          <Input name="amount" type="number" defaultValue={amount} onChange={(e) => setAmount(e.target.value)} />
        </FormElement>
        <Back onClick={() => setProposal('membersMenu')} />
        <Button onClick={submit}>Submit</Button>
      </Form>
    </Flex>
  )
}
