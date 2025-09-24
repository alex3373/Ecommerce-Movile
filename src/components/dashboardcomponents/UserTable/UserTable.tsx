import {
  IonCard,
  IonCardContent,
  IonAvatar,
  IonIcon,
  IonSpinner,
} from '@ionic/react';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import './UserTable.css';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../../services/firebase';
import UserFilter from '../UserFilter/UserFilter';

interface User {
  id: string;
  name: string;
  lastName: string;
  createdAt: string;
  photo: string | null;
  activo?: boolean;
  email?: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('usuario_actual') || '{}');
      const currentEmail = currentUser?.email;

      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList: User[] = querySnapshot.docs
        .map((docSnap) => {
          const data = docSnap.data();
          const createdAtDate = data.createdAt?.toDate();
          const createdAtFormatted = createdAtDate
            ? createdAtDate.toLocaleDateString()
            : '';

          return {
            id: docSnap.id,
            name: data.name || '',
            lastName: data.lastName || '',
            email: data.email || '',
            createdAt: createdAtFormatted,
            photo: data.photo || null,
            activo: data.activo !== undefined ? data.activo : true,
          };
        })
        .filter((user) => user.email !== currentEmail); // ❌ excluye al usuario actual

      setUsers(userList);
      setFilteredUsers(userList);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (query: string) => {
    const q = query.toLowerCase().trim();

    if (q === '') {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) => {
      const fullName = `${user.name ?? ''} ${user.lastName ?? ''}`.toLowerCase();
      const email = user.email?.toLowerCase() ?? '';
      return fullName.includes(q) || email.includes(q);
    });

    setFilteredUsers(filtered);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const toggleStatus = async (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const user = filteredUsers[index];
    const nuevoEstado = !user.activo;

    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, { activo: nuevoEstado });

      const updated = filteredUsers.map((u, i) =>
        i === index ? { ...u, activo: nuevoEstado } : u
      );
      setFilteredUsers(updated);

      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, activo: nuevoEstado } : u))
      );
    } catch (error) {
      console.error('Error al actualizar estado del usuario:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <IonCard className="user-table-card">
        <IonCardContent style={{ display: 'flex', justifyContent: 'center' }}>
          <IonSpinner name="dots" />
        </IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonCard className="user-table-card">
      <IonCardContent>
        <UserFilter onFilter={handleFilter} />

        <table className="user-table no-header">
          <tbody>
            {filteredUsers.map((user, idx) => {
              const isExpanded = idx === expandedIndex;
              const fullName = `${user.name} ${user.lastName}`;
              const avatarSrc =
                user.photo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  fullName
                )}&background=random`;

              return (
                <tr
                  key={user.id}
                  className={`user-row ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => toggleExpand(idx)}
                >
                  <td className="avatar-name-cell">
                    <IonAvatar>
                      <img src={avatarSrc} alt={`Avatar de ${fullName}`} />
                    </IonAvatar>
                    <div className="user-name">{fullName}</div>
                  </td>

                  <td className="role-date-cell">
                    <div className="user-role">Registrado</div>
                    <div className="user-date">{user.createdAt}</div>
                  </td>

                  <td>
                    <button
                      className={`status-pill ${user.activo ? 'active' : 'inactive'}`}
                      onClick={(e) => toggleStatus(e, idx)}
                    >
                      <IonIcon
                        icon={
                          user.activo
                            ? checkmarkCircleOutline
                            : closeCircleOutline
                        }
                      />
                      {user.activo ? 'Activado' : 'Desactivado'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </IonCardContent>
    </IonCard>
  );
};

export default UserTable;