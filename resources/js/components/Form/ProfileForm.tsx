import { useForm } from '@inertiajs/react'
import Input from '../UI/Input'
import Textarea from '../UI/TextArea'
import Toggle from '../UI/Toggle'

export default function ProfileForm({ profile }: any) {
    const { data, setData, post, processing } = useForm({
        country: profile?.country || '',
        university: profile?.university || '',
        mandarin_level: profile?.mandarin_level || '',
        toefl_score: profile?.toefl_score || '',
        tocfl_score: profile?.tocfl_score || '',
        skills: profile?.skills || '',
        certificates: profile?.certificates || '',
        learning_goal: profile?.learning_goal || '',
        bio: profile?.bio || '',
        is_public: profile?.is_public ?? true,
    })

    const submit = (e: any) => {
        e.preventDefault()
        post('/profile')
    }

    return (
        <form onSubmit={submit} className="max-w-3xl space-y-6">

            <h2 className="text-xl font-semibold">Complete Your Profile</h2>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Country"
                    value={data.country}
                    onChange={(e: any) => setData('country', e.target.value)}
                />

                <Input
                    label="University"
                    value={data.university}
                    onChange={(e: any) => setData('university', e.target.value)}
                />

                <Input
                    label="Mandarin Level"
                    value={data.mandarin_level}
                    onChange={(e: any) => setData('mandarin_level', e.target.value)}
                />

                <Input
                    label="TOEFL Score"
                    value={data.toefl_score}
                    onChange={(e: any) => setData('toefl_score', e.target.value)}
                />

                <Input
                    label="TOCFL Score"
                    value={data.tocfl_score}
                    onChange={(e: any) => setData('tocfl_score', e.target.value)}
                />
            </div>

            <Textarea
                label="Skills"
                value={data.skills}
                onChange={(e: any) => setData('skills', e.target.value)}
            />

            <Textarea
                label="Certificates"
                value={data.certificates}
                onChange={(e: any) => setData('certificates', e.target.value)}
            />

            <Textarea
                label="Learning Goal"
                value={data.learning_goal}
                onChange={(e: any) => setData('learning_goal', e.target.value)}
            />

            <Textarea
                label="Bio"
                value={data.bio}
                onChange={(e: any) => setData('bio', e.target.value)}
            />

            <Toggle
                label="Make profile public"
                checked={data.is_public}
                onChange={(val: boolean) => setData('is_public', val)}
            />

            <button
                disabled={processing}
                className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-80"
            >
                Save Profile
            </button>
        </form>
    )
}