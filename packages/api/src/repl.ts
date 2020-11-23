// Add stuff here to experiment with libraries
function main() {
  const query = `lskdjflskj
  query Posts {\\n' +
[dev:api]     '  posts {\\n' +
[dev:api]     '    id\\n' +
[dev:api]     '    title\\n' +
[dev:api]     '    author {\\n' +
[dev:api]     '      id\\n' +
[dev:api]     '      name\\n' +
[dev:api]     '    }\\n' +
[dev:api]     '`

  const operationName = query.match(/(query|mutate) (.*) {/)?.[2]
  console.dir(operationName)
}
main()