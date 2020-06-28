import { Injectable } from '@angular/core';
import { AssemblyConverter } from '@app/core/converters';
import { Assembly, AssemblyStat } from '@app/core/models/assembly';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const getAssembliesQuery = gql`
  query assemblies($first: Int!, $offset: Int!, $order: [_AssemblyOrdering]) {
    Assembly(first: $first, offset: $offset, orderBy: $order) {
        name,
        version,
        shortName,
      	isNative,
      	maxDepth,
        directReferenceCount
    },
    AssemblyCount
  }
`;

const getAssembliesWithFilterQuery = gql`
  query assemblies($first: Int!, $offset: Int!, $order: [_AssemblyOrdering], $filter: String!) {
    Assembly(first: $first, offset: $offset, orderBy: $order, filter: {shortName_contains : $filter}) {
        name,
        version,
        shortName,
      	isNative,
      	maxDepth,
        directReferenceCount
    },
    AssemblyCount(filter: {shortName_contains : $filter})
  }
`;

const getAssemblyDepthQuery = gql`
  query softwareAssemblies($assemblyId: String!, $depth: Int!) {
    Assembly(filter: { name: $assemblyId }){
      name,
      shortName,
      isNative,
      version,
      allReferencedAssemblies(depth: $depth) {
        name,
        shortName,
        isNative,
        version,
      },
      allReferencedAssembliesLinks {source, target}
    }
  }
`;

const removeAssemblyQuery = gql`
  mutation RemoveAssembly($assemblyName: String!) {
    removeAssembly(assemblyName: $assemblyName) {
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AssemblyService {


  constructor(private apolloService: Apollo) { }

  assemblyStatistics(pageSize: number, page: number, namefilte: string, order: string)
    : Observable<{ assemblies: AssemblyStat[], count: number }> {

    const query = !namefilte ? this.assemblyStatisticsNoFilter(pageSize, page, order) :
      this.assemblyStatisticsWithFilter(pageSize, page, namefilte, order);

    return query.pipe(
      map((x: any) => ({
        assemblies: x.data.Assembly.map((a: any) => AssemblyConverter.toAssemblyStat(a)),
        count: x.data.AssemblyCount
      }))
    );
  }

  private assemblyStatisticsWithFilter(pageSize: number, page: number, namefilter: string, order: string)
    : Observable<ApolloQueryResult<unknown>> {

    return this.apolloService.query({
      query: getAssembliesWithFilterQuery,
      variables: {
        first: pageSize,
        offset: pageSize * page,
        order,
        filter: namefilter
      }
    });
  }

  private assemblyStatisticsNoFilter(pageSize: number, page: number, order: string): Observable<ApolloQueryResult<unknown>> {

    return this.apolloService.query({
      query: getAssembliesQuery,
      variables: {
        first: pageSize,
        offset: pageSize * page,
        order
      }
    });
  }

  references(id: string, depth: number): Observable<Assembly> {
    return this.apolloService.query({
      query: getAssemblyDepthQuery,
      variables: {
        assemblyId: id,
        depth
      }
    }).pipe(
      map((x: any) => x.data.Assembly[0]),
      map((x: any) => AssemblyConverter.toAssembly(x))
    );
  }

  remove(id: string): Observable<string> {
    return this.apolloService.mutate({
      mutation: removeAssemblyQuery,
      variables: {
        assemblyName: id
      }
    }).pipe(
      map((x: any) => x.name)
    );
  }
}
