import { PACommand } from '..';
import PAPacket from '../../packet';
import { ChannelVolume, VolumeInfo } from '../../types/pulseaudio';
interface SetSinkVolume extends PACommand<VolumeInfo> {
    query: (requestId: number, sink: number | string, channelVolumes: ChannelVolume) => PAPacket;
}
declare const SetSinkVolume: SetSinkVolume;
export default SetSinkVolume;
