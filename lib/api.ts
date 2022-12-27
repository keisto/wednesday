export const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: {
  url: string
  method: string
  body?: {}
  json?: boolean
}) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('API Error')
  }

  if (json) {
    const { data } = await res.json()
    return data
  }

  return res
}

export const register = (user: {}) => {
  return fetcher({ url: '/api/register', method: 'POST', body: user })
}

export const signin = (user: {}) => {
  return fetcher({ url: '/api/register', method: 'POST', body: user })
}
