interface HeaderLinkProps {
    name: string,
    url: string
}

export default function HeaderLink({name, url}: HeaderLinkProps) {
    return <>
      <div className="header-link">
                    <a href={url}>{name}</a>
                </div>
    </>
}