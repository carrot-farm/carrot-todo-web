

// ===== 쿠키 저장
type TSetCookieOptions = {
  /** 쿠키 유효기간(절대시간 기준, 미설정 시 session) */
  expiryDay?: number;
  /** 초단위 유효시간 설정(현재 시간으로 부터 경과후) */
  maxAge?: number;
  /** 경로 */
  path?: string;
  /** 생성 도메인(eg: example.com, www.google.com) */
  domain?: string;
  /** js에서 쿠키 확인 불가 */
  httpOnly?: boolean;
  /** https 통신시만 가능 */
  secure?: boolean;
  /** 사용자가 외부에서 왔을 경우 쿠키 전송제한  */
  sameSite?: "strict" | "lax";
};
export const setCookie = (name: string, value: string, options: TSetCookieOptions = {}) => {
  const date = new Date();
  const {
    expiryDay,
    maxAge,
    path = '/',
    domain,
    httpOnly,
    secure,
    sameSite,
  } = {
    path: '/',
    ...options
  };
  let cookie = `${name}=${encodeURIComponent(value)}`;
  
  
  // # 날짜 기준 유효시간 설정
  if(expiryDay) {
    const day = date.getTime() + expiryDay * (60 * 60 * 24 * 1000);
    date.setTime(day);
    cookie += '; expires='+date.toUTCString();
  } 

  if(maxAge !== undefined) {
    cookie += `; max-age=${maxAge}`
  }

  if(domain) {
    cookie += `; domain=${domain}`;
  }

  // # js에서 쿠키 확인 불가
  if(httpOnly) {
    cookie += `; HttpOnly`;
  }

  if(secure) {
    cookie += `; secure`;
  }

  if(sameSite) {
    cookie += `; samesite=${sameSite}`;
  }

  // console.log('> setCookie: ', cookie);

  document.cookie = `${cookie};path=${path}`;
}

// ===== 쿠키 읽기
export const getCookie = (name: string) => {
  // const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  const value = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  // console.log('> getCookie', value)
  return value? decodeURIComponent(value[1]) : null;
};

// ===== 쿠키 삭제
export const deleteCookie = (name: string, path: string = '/') => {
  const date = new Date();
  // document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
  document.cookie = `${name}=;max-age=-1;path=${path}`;
};