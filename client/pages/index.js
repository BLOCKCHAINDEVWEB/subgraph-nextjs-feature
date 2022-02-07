import { useState, useEffect } from 'react'
import Head from 'next/head'
import { gql } from '@apollo/client'
import { ethers } from 'ethers'

import client from '../apollo-client'
import { SelectEvent } from '../components/SelectEvent'


const tokensQuery = `
  query($first: Int, $orderDirection: String) {
    claimSubmits (
      first: $first, orderBy: _claimID, orderDirection: $orderDirection
    ) {
      id
      _transactionID
      _claimID
      _receiver
    }
    disputes (
      first: $first, orderBy: _disputeID, orderDirection: $orderDirection
    ) {
      id
      _arbitrator
      _disputeID
      _metaEvidenceID
    }
    evidences (
      first: $first, orderBy: id, orderDirection: $orderDirection
    ) {
      id
      _arbitrator
      _evidenceGroupID
      _party
      _evidence
    }
    hasToPayFees (
      first: $first, orderBy: _transactionID, orderDirection: $orderDirection
    ) {
      id
      _transactionID
      _party
    }
    metaEvidences (
      first: $first, orderBy: _metaEvidenceID, orderDirection: $orderDirection
    ) {
      id
      _metaEvidenceID
      _evidence
    }
    metaTransactionExecuteds (
      first: $first, orderBy: id, orderDirection: $orderDirection
    ) {
      id
      userAddress
      relayerAddress
      functionSignature
    }
    payments (
      first: $first, orderBy: _transactionID, orderDirection: $orderDirection
    ) {
      id
      _transactionID
      _amount
      _receiver
    }
    refunds (
      first: $first, orderBy: _transactionID, orderDirection: $orderDirection
    ) {
      id
      _transactionID
      _amount
      _party
    }
    rulings (
      first: $first, orderBy: _disputeID, orderDirection: $orderDirection
    ) {
      id
      _arbitrator
      _disputeID
      _ruling
    }
  }
`
export default function Home({ data }) {
  const [resultsData, setResultsData] = useState({})
  const [eventSelected, setEventSelected] = useState([])
  const [isDisabledButton, setIsDisabledButton] = useState(true)
  const [isLoading, setIsLoading]  = useState(false)

  useEffect(async () => {
    if (!data) return
    setResultsData(data)
  }, [data])

  return (
    <>
      <Head>
        <title>Read blockchain</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-center pt-3 pb-5">Read smart contract Feature</h1>
        <div className={`w-1/4 flex flex-wrap flex-row place-items-center mx-auto`}>
          <div className="w-screen ml-[60%]">
            <SelectEvent
              event={eventSelected}
              setEvent={value => setEventSelected(value)}
            />
          </div>
        </div>
        <div className="p-5">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              {eventSelected === 'transactions' &&
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">TransactionId</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">MetaEvidence</div>
                  </th>
                </tr>
              }
              {eventSelected === 'claims' &&
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">ClaimId</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Receiver</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">TransactionId</div>
                  </th>
                </tr>
              }
              {eventSelected === 'payments' &&
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">TransactionId</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Receiver</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Amount (ETH)</div>
                  </th>
                </tr>
              }
              {eventSelected === 'refunds' &&
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">TransactionId</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Party</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Amount (ETH)</div>
                  </th>
                </tr>
              }
              {eventSelected === 'disputes' &&
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">DisputeId</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Arbitrator</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">ClaimId</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">EvidenceGroupeId</div>
                  </th>
                </tr>
              }
              {eventSelected === 'rulings' &&
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">DisputeId</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Arbitrator</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Ruling</div>
                  </th>
                </tr>
              }
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {eventSelected === 'transactions' && resultsData?.metaEvidences?.map((event, i) =>
                  <tr key={i}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">
                          {event._metaEvidenceID}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">
                          <a href={`https://gateway.pinata.cloud/ipfs/${event._evidence.split('/').pop()}`}>
                            {event._evidence}
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                {eventSelected === 'claims' && resultsData?.claimSubmits?.map((event, i) =>
                  <tr key={i}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">
                          {event._claimID}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">{event._receiver}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">{event._transactionID}</div>
                      </div>
                    </td>
                  </tr>
                )}
                {eventSelected === 'payments' && resultsData?.payments?.map((event, i) =>
                  <tr key={i}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">
                          {event._transactionID}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">{event._receiver}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">{ethers.utils.formatEther(event._amount).toString()}</div>
                      </div>
                    </td>
                  </tr>
                )}
                {eventSelected === 'refunds' && resultsData?.refunds?.map((event, i) =>
                  <tr key={i}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">
                          {event._transactionID}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">{event._party}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">{ethers.utils.formatEther(event._amount).toString()}</div>
                      </div>
                    </td>
                  </tr>
                )}
                {eventSelected === 'disputes' && resultsData?.disputes?.map((event, i) =>
                  <tr key={i}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">
                          {event._disputeID}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">{event._arbitrator}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">{event._metaEvidenceID}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">{event._evidenceGroupID}</div>
                      </div>
                    </td>
                  </tr>
                )}
                {eventSelected === 'rulings' && resultsData?.rulings.map((event, i) =>
                  <tr key={i}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">
                          {event._disputeID}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">{event._arbitrator}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 text-center font-medium text-gray-800">{event._ruling}</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps = async context => {
    const { data } = await client.query({
      query: gql(tokensQuery),
      variables: {
        first: 10,
        orderDirection: 'desc',
      }
    })

    return {
      props: {
        data: data
      }
   }
}