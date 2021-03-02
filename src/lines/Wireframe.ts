import { InstancedInterleavedBuffer, InterleavedBufferAttribute, Mesh, Vector3 } from 'three'
import { LineSegmentsGeometry } from '../lines/LineSegmentsGeometry'
import { LineMaterial } from '../lines/LineMaterial'

class Wireframe extends Mesh {
  geometry: LineSegmentsGeometry
  material: LineMaterial

  type = 'Wireframe'
  isWireframe = true

  private start = new Vector3()
  private end = new Vector3()

  constructor(geometry?: LineSegmentsGeometry, material?: LineMaterial) {
    super()

    this.geometry = geometry !== undefined ? geometry : new LineSegmentsGeometry()
    this.material = material !== undefined ? material : new LineMaterial({ color: Math.random() * 0xffffff })
  }

  computeLineDistances = () => {
    const geometry = this.geometry

    const instanceStart = geometry.attributes.instanceStart as InterleavedBufferAttribute
    const instanceEnd = geometry.attributes.instanceEnd
    const lineDistances = new Float32Array(2 * instanceStart.data.count)

    for (let i = 0, j = 0, l = instanceStart.data.count; i < l; i++, j += 2) {
      this.start.fromBufferAttribute(instanceStart, i)
      this.end.fromBufferAttribute(instanceEnd, i)

      lineDistances[j] = j === 0 ? 0 : lineDistances[j - 1]
      lineDistances[j + 1] = lineDistances[j] + this.start.distanceTo(this.end)
    }

    const instanceDistanceBuffer = new InstancedInterleavedBuffer(lineDistances, 2, 1) // d0, d1

    geometry.setAttribute('instanceDistanceStart', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 0)) // d0
    geometry.setAttribute('instanceDistanceEnd', new InterleavedBufferAttribute(instanceDistanceBuffer, 1, 1)) // d1

    return this
  }
}

export { Wireframe }
