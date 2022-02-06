import {
  ClaimSubmit as ClaimSubmitEvent,
  Dispute as DisputeEvent,
  Evidence as EvidenceEvent,
  HasToPayFee as HasToPayFeeEvent,
  MetaEvidence as MetaEvidenceEvent,
  MetaTransactionExecuted as MetaTransactionExecutedEvent,
  Payment as PaymentEvent,
  Refund as RefundEvent,
  Ruling as RulingEvent
} from "../generated/Feature/Feature"
import {
  ClaimSubmit,
  Dispute,
  Evidence,
  HasToPayFee,
  MetaEvidence,
  MetaTransactionExecuted,
  Payment,
  Refund,
  Ruling
} from "../generated/schema"

export function handleClaimSubmit(event: ClaimSubmitEvent): void {
  let entity = new ClaimSubmit(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._transactionID = event.params._transactionID
  entity._claimID = event.params._claimID
  entity._receiver = event.params._receiver
  entity.save()
}

export function handleDispute(event: DisputeEvent): void {
  let entity = new Dispute(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._arbitrator = event.params._arbitrator
  entity._disputeID = event.params._disputeID
  entity._metaEvidenceID = event.params._metaEvidenceID
  entity._evidenceGroupID = event.params._evidenceGroupID
  entity.save()
}

export function handleEvidence(event: EvidenceEvent): void {
  let entity = new Evidence(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._arbitrator = event.params._arbitrator
  entity._evidenceGroupID = event.params._evidenceGroupID
  entity._party = event.params._party
  entity._evidence = event.params._evidence
  entity.save()
}

export function handleHasToPayFee(event: HasToPayFeeEvent): void {
  let entity = new HasToPayFee(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._transactionID = event.params._transactionID
  entity._party = event.params._party
  entity.save()
}

export function handleMetaEvidence(event: MetaEvidenceEvent): void {
  let entity = new MetaEvidence(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._metaEvidenceID = event.params._metaEvidenceID
  entity._evidence = event.params._evidence
  entity.save()
}

export function handleMetaTransactionExecuted(
  event: MetaTransactionExecutedEvent
): void {
  let entity = new MetaTransactionExecuted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.userAddress = event.params.userAddress
  entity.relayerAddress = event.params.relayerAddress
  entity.functionSignature = event.params.functionSignature
  entity.save()
}

export function handlePayment(event: PaymentEvent): void {
  let entity = new Payment(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._transactionID = event.params._transactionID
  entity._amount = event.params._amount
  entity._receiver = event.params._receiver
  entity.save()
}

export function handleRefund(event: RefundEvent): void {
  let entity = new Refund(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._transactionID = event.params._transactionID
  entity._amount = event.params._amount
  entity._party = event.params._party
  entity.save()
}

export function handleRuling(event: RulingEvent): void {
  let entity = new Ruling(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._arbitrator = event.params._arbitrator
  entity._disputeID = event.params._disputeID
  entity._ruling = event.params._ruling
  entity.save()
}
