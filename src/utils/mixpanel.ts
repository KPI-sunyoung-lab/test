import mixpanel from 'mixpanel-browser'

let isInitialized = false

// Mixpanel 초기화 함수
export const initMixpanel = (token: string) => {
  if (token && !isInitialized) {
    mixpanel.init(token, {
      debug: import.meta.env.DEV, // 개발 모드에서만 디버그 활성화
      track_pageview: true, // 자동 페이지뷰 추적
      persistence: 'localStorage', // 로컬 스토리지에 사용자 정보 저장
    })
    isInitialized = true
  }
}

// 이벤트 추적 함수
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (isInitialized) {
    try {
      mixpanel.track(eventName, properties)
    } catch (error) {
      console.error('Mixpanel track error:', error)
    }
  }
}

// 사용자 식별 함수
export const identifyUser = (userId: string, userProperties?: Record<string, any>) => {
  if (isInitialized) {
    try {
      mixpanel.identify(userId)
      if (userProperties) {
        mixpanel.people.set(userProperties)
      }
    } catch (error) {
      console.error('Mixpanel identify error:', error)
    }
  }
}

// 사용자 속성 설정 함수
export const setUserProperties = (properties: Record<string, any>) => {
  if (isInitialized) {
    try {
      mixpanel.people.set(properties)
    } catch (error) {
      console.error('Mixpanel set user properties error:', error)
    }
  }
}

// 페이지뷰 추적 함수
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  if (isInitialized) {
    try {
      mixpanel.track('Page View', {
        page: pageName,
        ...properties,
      })
    } catch (error) {
      console.error('Mixpanel page view error:', error)
    }
  }
}

// 로그아웃 시 사용자 정보 리셋
export const resetMixpanel = () => {
  if (isInitialized) {
    try {
      mixpanel.reset()
    } catch (error) {
      console.error('Mixpanel reset error:', error)
    }
  }
}

export default mixpanel

