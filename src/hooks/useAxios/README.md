## useAxios

```ts
export interface IData {
  breeds: any[]
  id: string
  url: string
  width: number
  height: number
}
const { loading, response, cancelFn, refetchFn, error } = useAxios<IData[]>(
  {
    cancelable: true,
    url: '/demo',
    params: {
      size: 'small',
      limit: 6,
    },
  },
  [true],
)
```
