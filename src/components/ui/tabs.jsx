import React, { useState } from 'react'

const TabsContext = React.createContext(undefined)

function Tabs({ defaultValue, value: controlledValue, onValueChange, className, children }) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = controlledValue ?? internalValue
  
  const handleValueChange = (newValue) => {
    if (!controlledValue) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }
  
  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

const useTabsContext = () => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs component')
  }
  return context
}

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-md p-1 text-gray-500 ${className || ''}`}
    role="tablist"
    {...props}
  />
))
TabsList.displayName = 'TabsList'

const TabsTrigger = ({ className, value, ...props }) => {
  const { value: selectedValue, onValueChange } = useTabsContext()
  const isSelected = selectedValue === value
  
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isSelected ? 'bg-white text-gray-950 shadow-sm' : 'hover:bg-gray-100 hover:text-gray-950'} ${className || ''}`}
      onClick={() => onValueChange(value)}
      {...props}
    />
  )
}
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef(({ className, value, ...props }, ref) => {
  const { value: selectedValue } = useTabsContext()
  
  if (selectedValue !== value) return null
  
  return (
    <div
      ref={ref}
      role="tabpanel"
      className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 ${className || ''}`}
      {...props}
    />
  )
})
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }

