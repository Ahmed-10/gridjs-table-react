import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import DataTable from './components/dataTable'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Grid js custom table</h1>
        <DataTable 
          columns={["Name", "Username", "Email"]}
          url="https://5fbdb7183f8f90001638d398.mockapi.io/mock-data/v1/users"
          mapFunc={(user) => [user.name, user.username, user.email]}
          searchFields={[
            { value: "name", label: "name" },
            { value: "username", label: "username" },
            { value: "email", label: "email" }
          ]}
          sortColumns={["name", "username", "email"]}
          paginationLimit={5}
        />
      </header>
    </div>
  )
}

export default App
