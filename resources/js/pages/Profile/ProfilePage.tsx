import ProfileForm from '@/components/Form/ProfileForm';

export default function ProfilePage({ profile }: any) {
    return (
        <div className="p-6">
            <h1 className="mb-4 text-xl font-bold">Edit Profile</h1>

            <ProfileForm profile={profile} />
        </div>
    );
}
