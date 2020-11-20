import { UserRole } from '../../__generated__/globalTypes'
import { RouteMeta } from '../types'

const slug = 'admin'
const routeMeta: RouteMeta = {
  title: 'Admin Dashboard',
  slug,
  path: `/${slug}`,
  allowRoles: [UserRole.ADMIN],
  hidden: true,
}
export default routeMeta
