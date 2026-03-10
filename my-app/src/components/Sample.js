
function makeId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

const SAMPLE = [
  { id: makeId(),
     title: 'Welcome', 
     body: '# Welcome\n\nThis is your first note. Edit or create a new one!', 
     updatedAt: Date.now()
  },
  {
    id: makeId(),
    title: 'Project Ideas',
    body: '# Project Ideas\n\n- Note-taking app\n- Task manager\n- Personal blog\n- Recipe organizer',
    updatedAt: Date.now()
  },

]
export default SAMPLE