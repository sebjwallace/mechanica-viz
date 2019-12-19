
export default {
  id: 'AppTabs',
  states: [
    { id: 'visible', initial: true }
  ],
  transitions: [],
  data: {
    tabs: [
      { id: 'machine', label: 'Machine' },
      { id: 'registry', label: 'Registry' },
      { id: 'tree', label: 'Tree' }
    ],
    selectedTab: 'machine'
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