import { create } from "zustand"

const graphData = create((set, get) => ({
    nodes: {
      '1': {x: 200, y: 200},
      '2': {x: 400, y: 400},
      '3': {x: 500, y: 300}
    },
    edges: [
      {from: '1', to: '2', weight: 5, direction: 'out'}
    ],
    updateNodePos: (id:string, x:number, y:number) => set((state:any) => ({
      nodes: {
        ...state.nodes,
        [id]: {...state.nodes[id], x, y}
      }
    })),

    deleteNode: (nodeId:string) => set((state:any) => {
        const newNodes = { ...state.nodes };
        delete newNodes[nodeId];

        const newEdges = state.edges.filter(
            (edge:any) => edge.from !== nodeId && edge.to !== nodeId
        );

        return {
            nodes: newNodes,
            edges: newEdges,
            contextMenu: { ...state.contextMenu, isOpen: false }
        };
    }),

    addNode: (x: number, y: number) => set((state:any) => {
        const newId = String(Object.keys(state.nodes).length + 1); // Простая генерация ID
        return {
            nodes: {
                ...state.nodes,
                [newId]: { id: newId, x, y }
            }
        };
    }),
    
    contextMenu: { isOpen: false, x: 0, y: 0, nodeId: null },
    editorIsOpen: {isOpen: false},

    curNodeId: null,

    openEditor: (nodeId:string) => set({
      curNodeId: nodeId,
      editorIsOpen: {isOpen: true},
    }),

    closeLinkEditor: () => set({
      editorIsOpen: {isOpen: false}
    }),

    openContextMenu: (nodeId:string, x:number, y:number) => set({ 
      contextMenu: { isOpen: true, x:x, y:y, nodeId:nodeId } 
    }),
    
    closeContextMenu: () => set((state:any) => ({
      contextMenu: { ...state.contextMenu, isOpen: false }
    })),

    sourceNodeId: null,

    selectNodeForConnection: (nodeId:string) => {
    const { sourceNodeId, edges } = get() as any;

    if (!sourceNodeId) {
      set({ sourceNodeId: nodeId });
    } 

    else if (sourceNodeId === nodeId) {
      set({ sourceNodeId: null });
    } 

    else {
      const edgeExists = edges.find((edge:any) => 
      (edge.from === sourceNodeId && edge.to === nodeId) || 
      (edge.from === nodeId && edge.to === sourceNodeId)
      );

      if (!edgeExists){
        const newEdge = { 
          from: sourceNodeId, 
          to: nodeId, 
          weight: 1,
          direction: "both"
        };
        
        set({ 
          edges: [...edges, newEdge],
          sourceNodeId: null
        });
    }}},

    updateEdge: (from:string, to:string, newWeight:number) => set((state:any) => ({
      edges: state.edges.map((e:any) => 
        (e.from === from && e.to === to) ? { ...e, weight: newWeight } : e
      )
    })),

    deleteEdge: (from:string, to:string) => set((state:any) => ({
      edges: state.edges.filter((e:any) => !(e.from === from && e.to === to))
    })),

    toggleDirection: (from: string, to: string) => set((state:any) => ({
      edges: state.edges.map((edge:any) => {
        if (edge.from === from && edge.to === to) {
          const nextDir = edge.direction === 'out' ? 'in' : 
                          edge.direction === 'in' ? 'both' : 'out';
          return { ...edge, direction: nextDir };
        }
        return edge;
      })
    })),

    currentTool: "select",
    
    setCurrentTool: () => {set((state:any) => ({
      currentTool: state.currentTool === "select" ? "delete" : "select"
    }))},

    photos: [],

    addPhoto: (url:string) => {set((state:any) => ({
      photos: [...state.photos, url]
    }))},

    bgImage: {src: "", brightness: "1", scale: "1"},

    setBgImageSrc: (url:string) => {set((state:any) => ({
      bgImage: {...state.bgImage, src: url}
    }))},

    setBrightness: (value:number) => {set((state:any) => ({
      bgImage: {...state.bgImage, brightness: String(value)}
    }))},

    setScale: (value:number) => {set((state:any) => ({
      bgImage: {...state.bgImage, scale: String(value)}
    }))},
  }))

export default graphData