import { getUsersAction } from "@/actions/users";
import { ClientUsersTable } from "@/components/client-users-table";

export async function UsersContainer({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) {
  try {
    // Fetch users from real API
    const response = await getUsersAction({
      pageNo: page - 1, // API uses 0-based indexing
      pageSize: perPage,
      sortBy: 'id',
      sortDir: 'asc',
    });
    
    if (!response.success) {
      return (
        <div className="p-4 text-center text-red-600">
          Error loading users: {response.error}
        </div>
      );
    }

    const usersData = response.data;

    return (
      <ClientUsersTable
        users={usersData?.content || []}
        page={page}
        perPage={perPage}
        totalUsers={usersData?.totalElements || 0}
        totalPages={usersData?.totalPages || 0}
        isLast={usersData?.last || true}
      />
    );
  } catch (error) {
    console.error('Error in UsersContainer:', error);
    return (
      <div className="p-4 text-center text-red-600">
        Error loading users. Please try again.
      </div>
    );
  }
}