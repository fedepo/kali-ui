import React, { useState, useMemo, useEffect } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../../../components/dao-dashboard/layout'
import { MembersList, MemberProfile } from '../../../../components/dao-dashboard/members'
import { GRAPH_URL } from '../../../../graph'
import { ethers } from 'ethers'
import { Flex } from '../../../../styles/elements'
import { Stack } from '@kalidao/reality'

const MembersPage = ({ members, votes, proposals }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [member, setMember] = useState(members[0])
  console.log('members {} votes {} proposals {}', members, votes, proposals)

  const list = useMemo(
    () =>
      members?.members
        .sort((a: { shares: number }, b: { shares: number }) => b.shares - a.shares)
        .filter((p: { shares: number }) => p.shares > 0),
    [members],
  )

  const memberVotes = useMemo(() => votes.filter((p: { voter: any }) => p.voter == member?.address), [votes, member])

  const memberProposals = useMemo(
    () => proposals.filter((p: { proposer: any }) => p.proposer == member?.address),
    [proposals, member],
  )

  useEffect(() => {
    setMember(list[0])
  }, [list])

  return (
    <Layout heading={`Members`} content="Look at the members and their analytics for the DAO.">
      <Stack direction={'horizontal'}>
        <MembersList members={list} active={member} setActive={setMember} />
        <MemberProfile
          member={member}
          proposals={memberProposals}
          votes={memberVotes}
          totalSupply={members?.token?.totalSupply}
        />
      </Stack>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const address = (context?.params?.dao as string).toLowerCase()
  const chainId = context?.params?.chainId as unknown as number
  const res = await fetch(GRAPH_URL[chainId], {
    method: 'POST',
    body: JSON.stringify({
      query: `query {
          daos(where: {
            id: "${address}"
          }) {
              id
              members {
                  address
                  shares
                  proposals {
                    id
                  }
                }
                token {
                  totalSupply
                }
          }
          votes(where: {
            dao: "${address}"
          }) {
            voter
            vote
          }
          proposals(where: {
            dao: "${address}"
          }) {
            proposer
          }
        }`,
    }),
  })
  const data = await res.json()

  return {
    props: {
      members: data?.data.daos[0],
      votes: data?.data.votes,
      proposals: data?.data.proposals,
    },
  }
}

<<<<<<< HEAD:pages/daos/[chainId]/[dao]/members.tsx
export default MembersPage
=======
export default function MembersPage({ members, votes, proposals }) {
  const router = useRouter()
  const { chainId, dao } = router.query
  const [member, setMember] = useState(null)
  // const members = data && data['daos'][0]
  // if (loading) return "Loading..."
  console.log('members {} votes {} proposals {}', members, votes, proposals)

  const list = useMemo(
    () => members?.members.sort((a, b) => b.shares - a.shares).filter((p) => p.shares > 0),
    [members],
  )

  const memberVotes = useMemo(() => votes.filter((p) => p.voter == member?.address), [votes, member])

  const memberProposals = useMemo(() => proposals.filter((p) => p.proposer == member?.address), [proposals, member])

  console.log('memberVotes', memberVotes)
  console.log('memberProposals', memberProposals)
  // const memberProposals = proposals.length

  useEffect(() => {
    setMember(list[0])
  }, [list])

  return (
    <Layout heading={`Members`} content="Look at the members and their analytics for the DAO.">
      <Flex
        css={{
          height: '100%',
          maxWidth: '80vw',
          color: '$gray12',
          // borderLeft: '1px solid hsla(0, 0%, 90%, 0.1)',
          gap: '10px',
          justifyContent: 'flex-start',
        }}
      >
        <MembersList members={list} active={member} setActive={setMember} />
        <MemberProfile
          member={member}
          proposals={memberProposals}
          votes={memberVotes}
          totalSupply={members?.token?.totalSupply}
        />
      </Flex>
    </Layout>
  )
}
>>>>>>> 8cd1792483f8c6163e232bf55b8b9d855880a3a0:pages/daos/[chainId]/[dao]/members.js
