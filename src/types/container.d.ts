export interface ContainerData {
    Id: string;
    Names: string[];
    Image: string;
    ImageID: string;
    Command: string;
    Created: number;
    Ports: number[];
    Labels: any;
    State: 'running' | 'exited';
    Status: string;
    HostConfig: any;
    NetworkSettings: any;
    Mounts: any[];
}
