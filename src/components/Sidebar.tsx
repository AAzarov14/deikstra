import { useRef, useState } from 'react'
import graphData from './Store'

const Sidebar = () => {
  const allEdges = graphData((state: any) => state.edges);
  const allNodes = graphData((state: any) => state.nodes);

  const startInputField = useRef<HTMLInputElement>(null)
  const endInputField = useRef<HTMLInputElement>(null)

  const nodeIds = Object.keys(allNodes)

  const getWeight = (fromId:string, toId:string) => {
    const edge = allEdges.find((e:any) => 
      (e.from === fromId && e.to === toId) || 
      (e.from === toId && e.to === fromId)
    );
    return edge ? edge.weight : 0;
  };

  const buildAdjacencyList = (nodes:any, edges:any) => {
    const adj = {} as any;
    Object.keys(nodes).forEach((id:string) => adj[id] = []);
    
    edges.forEach(({ from, to, weight, direction }:{from:string, to:string, weight:number, direction:string}) => {
        adj[from].push({ node: to, weight: Number(weight) });
        if (direction === "both"){
        adj[to].push({ node: from, weight: Number(weight) });
        }
    });
    return adj;
  };

  const deikstra = (nodes:any, edges:any, startNode:string) => {
      const adj = buildAdjacencyList(nodes, edges);
      const distances = {} as any;
      const prev = {} as any;
      const pq = [startNode];

      Object.keys(nodes).forEach(id => {
          distances[id] = Infinity;
          prev[id] = null;
      });
      distances[startNode] = 0;

      while (pq.length > 0) {
          pq.sort((a, b) => distances[a] - distances[b]);
          const curr = pq.shift() as any;

          adj[curr].forEach((neighbor:any) => {
              const alt = distances[curr] + neighbor.weight;
              if (alt < distances[neighbor.node]) {
                  distances[neighbor.node] = alt;
                  prev[neighbor.node] = curr;
                  pq.push(neighbor.node);
              }
          });
      }
      return { distances, prev };
  };

  const [isValid, setIsValid] = useState(true)
  const [result, setResult] = useState("")
  const [path, setPath] = useState("")
  const [path2Point, setPath2point] = useState([] as string[])

  const calculate = () => {
    if (startInputField.current?.value){
      setIsValid(true)
      const {distances, prev} = deikstra(allNodes, allEdges, startInputField.current?.value)
      setResult(distances)
      setPath(prev)
    }
    else{
      setIsValid(false)
    }
  }

  const showWay = () => {
    const endPoint = endInputField.current?.value
    if (endPoint){
      const finalPath = []
      let curr = endPoint

      while (curr !== null){
        finalPath.unshift(curr)
        curr = path[+curr]
      }
      return finalPath
    }
    return []
  }

  return (
    <div id='sidebar'>
        <h1>My<strong>DKSTR</strong></h1>
        <div id='answer'>
          <div className='tableWrapper'>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  {nodeIds.map((item:string, index:number) => <th key={index}>{item}</th>)}
                </tr>
              </thead>
              <tbody>
                {nodeIds.map(rowId => (
                  <tr key={rowId}>
                    <td className="text-center">{rowId}</td>
                    
                    {nodeIds.map(colId => (
                      <td key={colId} className="text-center">
                        {rowId === colId ? '-' : getWeight(rowId, colId)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id='resultField'>
            <div id='startField' style={isValid ? {border: "solid 1px var(--glass_bg)"} : {border: "solid 1px var(--red)"}}>
              <label htmlFor='startingPoint'>Начальная точка<span style={{color: "var(--accent1)"}}>*</span></label>
              <input type='text' placeholder='1' name='startingPoint' ref={startInputField}></input>
            </div>
            <div id='distances'>
              {result? Object.entries(result).map((item:any, index:number) => <div className='distance'><h2 key={"node-"+index}>{item[0]}</h2><h2 className='ghostText'>-</h2><h2 key={"distance-"+index}>{item[1] === Infinity ? "∞" : item[1]}</h2></div>) : <p className='ghostText text-center'>Тут будет Ваш рассчет</p>}
              {result && <>
              <hr></hr>
              <label htmlFor='endPoint'>Конечная точка</label>
              <input type='text' placeholder='2' name='endPoint' ref={endInputField}></input><button onClick={() => setPath2point(showWay)}>Показать путь</button></>}
              <div id='path2point'>
                {path2Point && path2Point.map((item:any) => <h2 className='text-center'>→{item}</h2>)}
              </div>
            </div>
          </div>
        </div>
        <div className='sidebarEl'>
          <button onClick={calculate}>Решить</button>
        </div>
    </div>
  )
}

export default Sidebar