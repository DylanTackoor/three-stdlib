import { BufferGeometry, WireframeGeometry } from 'three'
import { LineSegmentsGeometry } from '../lines/LineSegmentsGeometry'

class WireframeGeometry2 extends LineSegmentsGeometry {
  type = 'WireframeGeometry2'
  isWireframeGeometry2 = true

  constructor(geometry: BufferGeometry) {
    super()
    this.fromWireframeGeometry(new WireframeGeometry(geometry))
  }

  // set colors, maybe
}

export { WireframeGeometry2 }
