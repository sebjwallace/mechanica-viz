
export default {
  id: 'AppTabs',
  states: [
    { id: 'visible', initial: true }
  ],
  transitions: [],
  data: {
    tabs: [
      { id: 'registry', label: 'Registry' },
      { id: 'machine', label: 'Machine' },
      { id: 'tree', label: 'Tree' }
    ],
    selectedTab: 'registry'
  },
  subscriptions: [
    {
      event: 'APP_TABS:SELECT_TAB',
      method: 'selectTab'
    }
  ],
  publications: [
    {
      id: 'updatedSelectedTab',
      event: 'APP_TABS:SELECTED_TAB',
      payload: ({ selectedTab }) => ({ selectedTab })
    }
  ],
  methods: {
    selectTab({ data, payload }){
      data.selectedTab = payload.tabId
      return {
        data,
        publish: 'updatedSelectedTab'
      }
    }
  }
}