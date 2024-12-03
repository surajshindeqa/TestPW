import { PACommand } from '..';
import PAPacket from '../../packet';
import { ChannelVolume, VolumeInfo } from '../../types/pulseaudio';
interface SetSourceVolume extends PACommand<VolumeInfo> {
    query: (requestId: number, source: number | string, channelVolumes: ChannelVolume) => PAPacket;
}
declare const SetSourceVolume: SetSourceVolume;
export default SetSourceVolume;
