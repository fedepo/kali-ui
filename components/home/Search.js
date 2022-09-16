import React, { useState } from 'react'
import { styled } from '../../styles/stitches.config'
import { GoSearch } from 'react-icons/go'
import { Text, Flex } from '../../styles/elements'

const SearchBar = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '5px',
  width: '70%',
  // maxWidth: '20rem',
  background: '$gray2',
  color: '$gray12',
  // border: '1px solid $gray6',
  borderRadius: '10px',
  gap: '15px',
  '&:focus': {
    outline: 'none',
  },

  '@media (max-width: 540px)': {
    minWidth: '20rem',
  },
})

const SearchInput = styled('input', {
  border: 'none',
  outline: 'none',
  background: 'none',
  color: '$gray12',
  lineHeight: '1.2',
  padding: '5px',
  fontSize: '16px',
})

export default function Search({ daos, setDisplay }) {
  const [search, setSearch] = useState('')
  const [searched, setSearched] = React.useState(false)

  const handleSearch = React.useCallback((e) => {
    if (search === '') return
    setSearched(false)

    const results = []

    Object.keys(daos).forEach((key) => {
      daos[key].forEach((dao) => {
        if (dao.token.name.toLowerCase().includes(search.toLowerCase())) {
          dao['chainId'] = key
          results.push(dao)
        }
      })
    })
    setDisplay(results)
    setSearched(true)
  })

  const handleKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.nativeEvent.charCode === 13) {
      handleSearch()
    }
  }

  return (
    <Flex
      css={{
        width: '100%',
        // background: 'Green',
      }}
    >
      <SearchBar>
        {/* <GoSearch /> */}
        <Text>🔎</Text>
        <SearchInput placeholder="search" onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeypress} />
      </SearchBar>
    </Flex>
  )
}
