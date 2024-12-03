import { PACommand } from '..';
import PAPacket from '../../packet';
import { Index } from '../../types/pulseaudio';
interface LoadModule extends PACommand<Index> {
    query: (requestId: number, name: string, argument: string) => PAPacket;
}
declare const LoadModule: LoadModule;
export default LoadModule;
