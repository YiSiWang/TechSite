import { GraphCanvas } from '@components/GraphCanvas'
import { Chat } from '@components/Chat'

export default function GraphAI() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <GraphCanvas></GraphCanvas>
      <Chat/>
    </div>
  )
}
