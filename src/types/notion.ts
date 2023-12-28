type User = {
  object: string
  id: string
}

type EmojiIcon = {
  type: string
  emoji: string
}

type DatabaseIdParent = {
  type: string
  database_id: string
}

type TextContent = {
  type: string
  text: {
    content: string
    link: null
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: null
}

type TitleProperty = {
  id: string
  type: string
  title: TextContent[]
}

type SelectOption = {
  id: string
  name: string
  color: string
}

type multiselectProperty = {
  id: string
  type: string
  multi_select: SelectOption[]
}

type selectProperty = {
  id: string
  type: string
  select: SelectOption
}

type RichTextProperty = {
  id: string
  type: string
  rich_text: RichTextContent[]
}

type RichTextContent = {
  type: string
  text: {
    content: string
    link: null
  }
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  plain_text: string
  href: null
}

type results<P> = {
  object: string
  id: string
  created_time: string
  last_edited_time: string
  created_by: User
  last_edited_by: User
  cover: null
  icon: EmojiIcon
  parent: DatabaseIdParent
  archived: boolean
  properties: P
  url: string
  public_url: null
}

type urlProperty = {
  id: string
  type: string
  url: string
}

export type page = results<{
  Name: TitleProperty
  Brand: selectProperty
  Address: RichTextProperty
  "Circular link": urlProperty
}>

type copy = results<{
  Name: TitleProperty
  Etiquetas: multiselectProperty
}>

export type notionRes<R> = {
  object: string
  results: R
  next_cursor: string
  has_more: boolean
  type: string
  page_or_database: {}
  request_id: string
}

export type storesRes = notionRes<page[]>

export type copysRes = notionRes<copy[]>

export type pageProcessed = {
  id: string
  name: string
  brand: string
  address: string
  circular: string
}

export type copyProcessed = {
  id: string
  name: string
  labels: string[]
}

export type copyElements = {
  storeName: string
  address: string
  startDate: string
  endDate: string
  circular: string | null
  randomcopy: string
  date: string
  copys: copyProcessed[]
}
